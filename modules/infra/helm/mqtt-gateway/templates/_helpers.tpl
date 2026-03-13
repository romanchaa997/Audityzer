{{/*
Expand the name of the chart.
*/}}
{{- define "mqtt-gateway.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
*/}}
{{- define "mqtt-gateway.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "mqtt-gateway.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "mqtt-gateway.labels" -}}
helm.sh/chart: {{ include "mqtt-gateway.chart" . }}
{{ include "mqtt-gateway.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app.kubernetes.io/part-of: auditorsec
{{- end }}

{{/*
Selector labels
*/}}
{{- define "mqtt-gateway.selectorLabels" -}}
app.kubernetes.io/name: {{ include "mqtt-gateway.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "mqtt-gateway.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "mqtt-gateway.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*
Generate mosquitto password file content from users map.
Note: In production, use pre-hashed passwords. This generates plaintext entries
that Mosquitto will hash on first load.
*/}}
{{- define "mqtt-gateway.passwdFile" -}}
{{- range $user, $pass := .Values.mosquitto.users -}}
{{ $user }}:{{ $pass }}
{{ end -}}
{{- end -}}
