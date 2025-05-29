
import EmailValidation from '@/modules/email/components/verficacion';

const EmailPage = () => {
    const handleCodeSubmit = (code: string) => {
        console.log('Code submitted:', code);
        // Add your validation logic here
    };

    const handleResendEmail = () => {
        console.log('Resending email...');
        // Add your resend logic here
    };

    return (
        <EmailValidation
            userEmail="user@example.com"
            onCodeSubmit={handleCodeSubmit}
            onResendEmail={handleResendEmail}
        />
    );
};

export default EmailPage

