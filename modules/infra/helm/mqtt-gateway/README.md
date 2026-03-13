# mqtt-gateway

Helm chart for DaBROIoTEXs MQTT broker gateway (Eclipse Mosquitto) serving IoT devices (ESP32 green energy sensors).

## Install

```bash
helm install mqtt-gateway ./mqtt-gateway \
  --namespace auditorsec --create-namespace \
  --set mosquitto.users.platform="secure-password" \
  --set mosquitto.users.esp32_default="device-password"
```

## Configuration

| Parameter | Description | Default |
|-----------|-------------|---------|
| `image.repository` | Container image | `eclipse-mosquitto` |
| `service.type` | Service type | `LoadBalancer` |
| `service.mqtt.port` | MQTT TCP port | `1883` |
| `service.mqtts.port` | MQTTS TLS port | `8883` |
| `service.websocket.port` | WebSocket port | `9001` |
| `mosquitto.allowAnonymous` | Allow anonymous connections | `false` |
| `mosquitto.users` | MQTT user credentials | `{}` |
| `persistence.size` | Data volume size | `5Gi` |

## IoT Device Configuration

ESP32 devices connect directly to the LoadBalancer IP on port 1883:

```cpp
const char* mqtt_server = "<LOADBALANCER_IP>";
const int mqtt_port = 1883;
const char* mqtt_user = "esp32_default";
const char* mqtt_pass = "<device-password>";
```

## Topic Structure

- `sensor/<device_id>/#` — Sensor data from devices
- `device/<device_id>/status` — Device status updates
- `command/<device_id>/#` — Commands to devices
