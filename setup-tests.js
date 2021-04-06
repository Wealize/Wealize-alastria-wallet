import MockAsyncStorage from 'mock-async-storage';

const mockImpl = new MockAsyncStorage();
jest.mock('@react-native-community/async-storage', () => mockImpl);

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

jest.mock('react-native-get-random-values', () => ({
    getRandomBase64: jest.fn(),
}));

jest.mock('react-native-keychain', () => ({
    setGenericPassword: jest.fn(),
    getGenericPassword: jest.fn(),
    resetGenericPassword: jest.fn()
}));

jest.mock('react-native-snackbar', () => ({
    show: jest.fn(),
}));