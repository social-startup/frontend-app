import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';

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
    <View style={globalStyles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={globalStyles.header}>
          <Ionicons name="chatbubbles" size={60} color={colors.primary} />
          <Text style={globalStyles.title}>SocialConnect</Text>
          <Text style={globalStyles.subtitle}>Connect with friends, share moments</Text>
        </View>

        <View style={globalStyles.formCard}>
          <View style={globalStyles.toggleContainer}>
            <TouchableOpacity
              style={[globalStyles.toggleButton, !isSignUp && globalStyles.activeToggle]}
              onPress={() => setIsSignUp(false)}
            >
              <Text style={[globalStyles.toggleText, !isSignUp && globalStyles.activeToggleText]}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[globalStyles.toggleButton, isSignUp && globalStyles.activeToggle]}
              onPress={() => setIsSignUp(true)}
            >
              <Text style={[globalStyles.toggleText, isSignUp && globalStyles.activeToggleText]}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={globalStyles.input}
            placeholder="Phone Number"
            placeholderTextColor={colors.textMuted}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            maxLength={10}
          />

          {otpSent && (
            <TextInput
              style={globalStyles.input}
              placeholder="Enter 6-digit OTP"
              placeholderTextColor={colors.textMuted}
              value={otp}
              onChangeText={setOtp}
              keyboardType="numeric"
              maxLength={6}
            />
          )}

          {!otpSent ? (
            <TouchableOpacity style={globalStyles.button} onPress={handleSendOtp}>
              <Text style={globalStyles.buttonText}>Send OTP</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={globalStyles.button} onPress={handleVerifyOtp}>
              <Text style={globalStyles.buttonText}>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => setOtpSent(false)}>
            <Text style={globalStyles.linkText}>Didn't receive OTP? Resend</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
