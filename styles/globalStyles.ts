import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const globalStyles = StyleSheet.create({
  // Buttons
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: colors.textWhite,
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  actionText: {
    marginLeft: 8,
    color: colors.textDark,
    fontSize: 13,
    fontWeight: '600',
  },

  // Cards
  card: {
    backgroundColor: colors.primaryLight,
    borderRadius: 10,
    padding: 15,
    elevation: 3,
  },
  postCard: {
    backgroundColor: colors.textWhite,
    marginHorizontal: 8,
    marginVertical: 6,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  formCard: {
    backgroundColor: colors.primaryLight,
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },

  // Inputs
  input: {
    backgroundColor: colors.textWhite,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: colors.textDark,
  },

  // Text Styles
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
  },
  subtitle: {
    fontSize: 16,
    color: colors.primary,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textWhite,
    letterSpacing: 0.5,
  },
  userName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textDark,
    marginLeft: 10,
    flex: 1,
  },
  postText: {
    fontSize: 15,
    color: colors.textDark,
    lineHeight: 22,
    marginBottom: 10,
    fontWeight: '500',
  },
  linkText: {
    color: colors.primary,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },

  // Toggle Styles
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: colors.primaryLighter,
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
    backgroundColor: colors.textWhite,
  },
  toggleText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  activeToggleText: {
    color: colors.textWhite,
  },

  // Feed and Header Styles
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: colors.primary,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postImage: {
    width: '100%',
    height: 220,
    borderRadius: 10,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: '#e0e0e0',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedContainer: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    paddingVertical: 6,
  },
});
