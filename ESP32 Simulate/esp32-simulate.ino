#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#include <AccelStepper.h>


const char* WIFI_SSID = "Wokwi-GUEST";
const char* WIFI_PASSWORD = "";

const char* SERVER = "https://gsm-illustration-completed-ridge.trycloudflare.com/devices";
const unsigned long UPDATE_INTERVAL = 2000;


// Lights
const int LIGHT1_PIN = 4;
const int LIGHT2_PIN = 16;
const int LIGHT3_PIN = 17;

// Fan 1
const int FAN1_STEP = 18;
const int FAN1_DIR  = 19;

// Fan 2
const int FAN2_STEP = 25;
const int FAN2_DIR  = 26;

const int BTN_FAN1   = 32;
const int BTN_FAN2   = 33;
const int BTN_LIGHT1 = 27;
const int BTN_LIGHT2 = 14;
const int BTN_LIGHT3 = 13;

const unsigned long DEBOUNCE_TIME = 50;

bool lastButtonState[5] = {HIGH, HIGH, HIGH, HIGH, HIGH};
unsigned long lastDebounceTime[5] = {0, 0, 0, 0, 0};

unsigned long ignoreServerUntil[5] = {0, 0, 0, 0, 0};
const unsigned long SERVER_IGNORE_TIME = 1000;


AccelStepper fan1(AccelStepper::DRIVER, FAN1_STEP, FAN1_DIR);
AccelStepper fan2(AccelStepper::DRIVER, FAN2_STEP, FAN2_DIR);



volatile bool fan1On = false;
volatile bool fan2On = false;

volatile bool light1On = false;
volatile bool light2On = false;
volatile bool light3On = false;


TaskHandle_t ButtonTaskHandle;

TaskHandle_t NetworkTaskHandle;
TaskHandle_t MotorTaskHandle;


void setup() {

  Serial.begin(115200);

  // Lights
  pinMode(LIGHT1_PIN, OUTPUT);
  pinMode(LIGHT2_PIN, OUTPUT);
  pinMode(LIGHT3_PIN, OUTPUT);

  digitalWrite(LIGHT1_PIN, LOW);
  digitalWrite(LIGHT2_PIN, LOW);
  digitalWrite(LIGHT3_PIN, LOW);

  // Stepper Driver Pins
  pinMode(FAN1_STEP, OUTPUT);
  pinMode(FAN1_DIR, OUTPUT);

  pinMode(FAN2_STEP, OUTPUT);
  pinMode(FAN2_DIR, OUTPUT);

  digitalWrite(FAN1_DIR, HIGH);
  digitalWrite(FAN2_DIR, HIGH);

  // -------- Buttons --------
  pinMode(BTN_FAN1, INPUT_PULLUP);
  pinMode(BTN_FAN2, INPUT_PULLUP);
  pinMode(BTN_LIGHT1, INPUT_PULLUP);
  pinMode(BTN_LIGHT2, INPUT_PULLUP);
  pinMode(BTN_LIGHT3, INPUT_PULLUP);
  // Configure Steppers
  fan1.setMaxSpeed(3000);
  fan1.setSpeed(500);

  fan2.setMaxSpeed(3000);
  fan2.setSpeed(500);

  connectWiFi();
  // Core 0 -> Buttons
  xTaskCreatePinnedToCore(
      ButtonTask,
      "ButtonTask",
      4000,
      NULL,
      2,
      &ButtonTaskHandle,
      0);
  // Core 0 -> WiFi + HTTP + JSON
  xTaskCreatePinnedToCore(
      NetworkTask,
      "NetworkTask",
      10000,
      NULL,
      1,
      &NetworkTaskHandle,
      0);

  // Core 1 -> Motors only
  xTaskCreatePinnedToCore(
      MotorTask,
      "MotorTask",
      4000,
      NULL,
      2,
      &MotorTaskHandle,
      1);
}
void loop() {

  // Nothing runs here.
  // FreeRTOS tasks handle everything.

  delay(1000);
}
void connectWiFi() {

  Serial.println();
  Serial.println("=================================");
  Serial.println("Office Energy Management System");
  Serial.println("=================================");

  Serial.println("Connecting to WiFi...");

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.println("WiFi Connected!");

  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}
String downloadDevices() {

  HTTPClient http;

  Serial.println();
  Serial.println("Downloading device list...");

  http.begin(SERVER);

  int httpCode = http.GET();

  if (httpCode > 0) {

    Serial.print("HTTP Response: ");
    Serial.println(httpCode);

    String payload = http.getString();

    http.end();

    return payload;
  }

  Serial.print("HTTP Error: ");
  Serial.println(httpCode);

  http.end();

  return "";
}

void NetworkTask(void *parameter)
{
  while (true)
  {
    String json = downloadDevices();

    if (json != "")
    {
      DynamicJsonDocument doc(16384);

      DeserializationError error = deserializeJson(doc, json);

      if (!error)
      {
        JsonArray devices = doc.as<JsonArray>();

        for (JsonObject device : devices)
        {
          int id = device["id"];
          bool status = device["status"];

          switch (id)
          {
            // ---------------- Fan 1 ----------------
            case 1:
              if (millis() > ignoreServerUntil[0])
              {
                fan1On = status;
              }

              Serial.print("Fan1 -> ");
              Serial.println(fan1On ? "ON" : "OFF");
              break;

            // ---------------- Fan 2 ----------------
            case 2:
              if (millis() > ignoreServerUntil[1])
              {
                fan2On = status;
              }

              Serial.print("Fan2 -> ");
              Serial.println(fan2On ? "ON" : "OFF");
              break;

            // ---------------- Light 1 ----------------
            case 3:
              if (millis() > ignoreServerUntil[2])
              {
                light1On = status;
                digitalWrite(LIGHT1_PIN, light1On);
              }

              Serial.print("Light1 -> ");
              Serial.println(light1On ? "ON" : "OFF");
              break;

            // ---------------- Light 2 ----------------
            case 4:
              if (millis() > ignoreServerUntil[3])
              {
                light2On = status;
                digitalWrite(LIGHT2_PIN, light2On);
              }

              Serial.print("Light2 -> ");
              Serial.println(light2On ? "ON" : "OFF");
              break;

            // ---------------- Light 3 ----------------
            case 5:
              if (millis() > ignoreServerUntil[4])
              {
                light3On = status;
                digitalWrite(LIGHT3_PIN, light3On);
              }

              Serial.print("Light3 -> ");
              Serial.println(light3On ? "ON" : "OFF");
              break;
          }
        }
      }
      else
      {
        Serial.print("JSON Parse Error: ");
        Serial.println(error.c_str());
      }
    }

    vTaskDelay(pdMS_TO_TICKS(UPDATE_INTERVAL));
  }
}
void MotorTask(void *parameter) {

  while (true) {

    if (fan1On)
      fan1.runSpeed();

    if (fan2On)
      fan2.runSpeed();

    taskYIELD();
  }
}
void postDeviceStatus(int deviceId, bool status)
{
  if (WiFi.status() != WL_CONNECTED)
    return;

  HTTPClient http;

  String url = String(SERVER) + "/" + String(deviceId);

  http.begin(url);
  http.addHeader("Content-Type", "application/json");

  String json = "{\"status\":";
  json += status ? "true" : "false";
  json += "}";

  int httpCode = http.POST(json);

  if (httpCode > 0)
  {
    Serial.print("POST Device ");
    Serial.print(deviceId);
    Serial.print(" -> ");
    Serial.println(status ? "ON" : "OFF");
  }
  else
  {
    Serial.print("POST Failed: ");
    Serial.println(httpCode);
  }

  http.end();
}
void handleButtons()
{
  const int buttonPins[5] = {
    BTN_FAN1,
    BTN_FAN2,
    BTN_LIGHT1,
    BTN_LIGHT2,
    BTN_LIGHT3
  };

  bool* states[5] = {
    (bool*)&fan1On,
    (bool*)&fan2On,
    (bool*)&light1On,
    (bool*)&light2On,
    (bool*)&light3On
  };

  const int deviceIds[5] = {1, 2, 3, 4, 5};

  const int lightPins[5] = {-1, -1, LIGHT1_PIN, LIGHT2_PIN, LIGHT3_PIN};

  for (int i = 0; i < 5; i++)
  {
    if (digitalRead(buttonPins[i]) == LOW)
    {
      Serial.print("Button ");
      Serial.print(i);
      Serial.println(" PRESSED");

      *states[i] = !(*states[i]);

      if (lightPins[i] != -1)
      {
        digitalWrite(lightPins[i], *states[i]);
      }

      ignoreServerUntil[i] = millis() + SERVER_IGNORE_TIME;

      postDeviceStatus(deviceIds[i], *states[i]);

      Serial.print("Device ");
      Serial.print(deviceIds[i]);
      Serial.print(" -> ");
      Serial.println(*states[i] ? "ON" : "OFF");

      // Wait until button released
      while (digitalRead(buttonPins[i]) == LOW)
      {
        vTaskDelay(pdMS_TO_TICKS(10));
      }

      // Small delay to prevent accidental double press
      vTaskDelay(pdMS_TO_TICKS(100));
    }
  }
}

void ButtonTask(void *parameter)
{
  while (true)
  {
    handleButtons();

    // Scan buttons every 10 ms
    vTaskDelay(pdMS_TO_TICKS(10));
  }
}