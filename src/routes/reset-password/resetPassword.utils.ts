const commonPatterns = [
    "password", "123456", "12345678", "abc", "qwerty", "111111", "letmein", "12345", "abc123", "password1"
];

const containsCommonPattern = (password: string): boolean => 
    commonPatterns.some(pattern => password.toLowerCase().includes(pattern));

export const passwordStrengthLevel = (password: string): string => {
    if (containsCommonPattern(password) || password.length < 8) 
        return "weak";

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const length = password.length;

    if (length < 10 || !(hasUppercase && hasSpecialChar)) 
        return "good";

    else if (length >= 10 && (hasUppercase && hasLowercase && hasNumber && hasSpecialChar)) 
        return "strong";
    else
        return "medium";
};