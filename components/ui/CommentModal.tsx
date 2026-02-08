import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { colors } from '../../styles/colors';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (text: string) => void;
  comments?: { id: string; user: string; text: string; date: string }[];
};

export default function CommentModal({ visible, onClose, onSubmit, comments = [] }: Props) {
  const [text, setText] = useState('');

  function handleSend() {
    if (!text.trim()) return;
    onSubmit(text.trim());
    setText('');
    onClose();
  }

  return (
    <Modal animationType="slide" transparent statusBarTranslucent visible={visible}>
      <View style={styles.backdrop}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={styles.box}>
          <Text style={styles.title}>Comments</Text>
          {comments && comments.length > 0 ? (
            <View style={{ maxHeight: 140, marginBottom: 8 }}>
              {comments.map((c) => (
                <View key={c.id} style={styles.commentRow}>
                  <Text style={styles.commentUser}>{c.user}:</Text>
                  <Text style={styles.commentText}>{c.text}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={{ color: '#6b7684', marginBottom: 8 }}>No comments yet</Text>
          )}

          <Text style={[styles.title, { marginTop: 6 }]}>Add a comment</Text>
          <TextInput
            placeholder="Write your comment..."
            value={text}
            onChangeText={setText}
            multiline
            style={styles.input}
          />

          <View style={styles.row}>
            <TouchableOpacity style={[styles.btn, styles.cancel]} onPress={() => { setText(''); onClose(); }}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.send]} onPress={handleSend}>
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  box: { backgroundColor: colors.textWhite, padding: 16, borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 8, color: colors.textDark },
  input: { minHeight: 80, borderRadius: 8, padding: 8, backgroundColor: '#f6f8fb', borderWidth: 1, borderColor: '#e6eef9' },
  row: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12 },
  btn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8, marginLeft: 8 },
  cancel: { backgroundColor: '#f0f4f8' },
  send: { backgroundColor: colors.primary },
  cancelText: { color: colors.textDark, fontWeight: '600' },
  sendText: { color: colors.textWhite, fontWeight: '700' },
  commentRow: { flexDirection: 'row', marginBottom: 6 },
  commentUser: { fontWeight: '700', marginRight: 6, color: colors.primary },
  commentText: { color: colors.textDark, flex: 1 },
});
