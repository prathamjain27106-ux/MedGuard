import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Audio } from 'expo-av';
import axios from 'axios';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | undefined>();

  // ⚠️ YOUR IP ADDRESS
  const BACKEND_URL = 'http://192.168.1.5:3000/api/verify'; 
  const VOICE_API_URL = 'http://192.168.1.5:3000/api/voice'; 

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>We need camera & mic permissions</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // --- 1. QR SCANNER FUNCTION ---
  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    setScanned(true);
    try {
      const response = await axios.post(BACKEND_URL, { batchId: data });
      if (response.data.status === 'AUTHENTIC') {
        Alert.alert("✅ Verified", response.data.message, [{ text: "Scan Next", onPress: () => setScanned(false) }]);
      } else {
        Alert.alert("🚨 FAKE DETECTED", response.data.message, [{ text: "Report", onPress: () => setScanned(false) }]);
      }
    } catch (err) {
      Alert.alert("Network Error", "Could not connect to backend.");
      setScanned(false);
    }
  };

  // --- 2. VOICE RECORDING FUNCTIONS (SARVAM AI SIMULATION) ---
  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      setRecording(recording);
    } catch (err) {
      Alert.alert("Failed to start recording");
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    if (recording) {
      await recording.stopAndUnloadAsync();
      
      Alert.alert("Processing", "Sending audio to Sarvam AI...");
      
      try {
        // Send to our new Next.js Voice API
        const response = await axios.post(VOICE_API_URL, { 
          transcript: "Dawai kharab hai (The medicine is damaged)", 
          batchId: "B123" 
        });
        
        Alert.alert("Sarvam AI Success", response.data.message);
      } catch (err) {
        Alert.alert("Error", "Could not reach Voice API.");
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>MedGuard Scanner</Text>
      
      <View style={styles.cameraContainer}>
        <CameraView 
          style={StyleSheet.absoluteFill}
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        />
      </View>
      
      {/* THE SMART MIC BUTTON */}
      <TouchableOpacity 
        style={[styles.micButton, recording ? styles.recordingActive : null]} 
        onPressIn={startRecording} 
        onPressOut={stopRecording}
      >
        <Text style={styles.micText}>
          {recording ? "🎙️ Recording... Release to Send" : "Hold to Speak (Hindi/Local)"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20, paddingTop: 60 },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  cameraContainer: { flex: 1, borderRadius: 20, overflow: 'hidden', marginBottom: 20 },
  text: { textAlign: 'center', marginBottom: 20, fontSize: 16 },
  button: { backgroundColor: '#007BFF', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold' },
  micButton: { backgroundColor: '#28a745', padding: 20, borderRadius: 15, alignItems: 'center' },
  recordingActive: { backgroundColor: '#dc3545' }, // Turns red when holding
  micText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});