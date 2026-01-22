import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function LandingPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }
    // Simulate sending OTP
    setOtpSent(true);
    Alert.alert('OTP Sent', 'An OTP has been sent to your phone number');
  };

  const handleVerifyOtp = () => {
    if (!otp || otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }
    // Simulate verification
    Alert.alert('Success', `${isSignUp ? 'Sign Up' : 'Sign In'} successful!`);
    // Navigate to feed
    router.push('/feed');
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.innerContainer}>
        <View style={styles.header}>
          <Ionicons name="chatbubbles" size={60} color="#007bff" />
          <Text style={styles.title}>SocialConnect</Text>
          <Text style={styles.subtitle}>Connect with friends, share moments</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, !isSignUp && styles.activeToggle]}
              onPress={() => setIsSignUp(false)}
            >
              <Text style={[styles.toggleText, !isSignUp && styles.activeToggleText]}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, isSignUp && styles.activeToggle]}
              onPress={() => setIsSignUp(true)}
            >
              <Text style={[styles.toggleText, isSignUp && styles.activeToggleText]}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#ccc"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            maxLength={10}
          />

          {otpSent && (
            <TextInput
              style={styles.input}
              placeholder="Enter 6-digit OTP"
              placeholderTextColor="#ccc"
              value={otp}
              onChangeText={setOtp}
              keyboardType="numeric"
              maxLength={6}
            />
          )}

          {!otpSent ? (
            <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
              <Text style={styles.buttonText}>Send OTP</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
              <Text style={styles.buttonText}>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => setOtpSent(false)}>
            <Text style={styles.linkText}>Didn't receive OTP? Resend</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007bff',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#007bff',
    marginTop: 5,
  },
  form: {
    backgroundColor: '#e6f3ff',
    borderRadius: 20,
    padding: 20,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 4,
    elevation: 5,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#cce7ff',
    borderRadius: 25,
    padding: 5,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeToggle: {
    backgroundColor: '#ffffff',
  },
  toggleText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  activeToggleText: {
    color: '#ffffff',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    // placeholderTextColor: '#999999',
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#007bff',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
