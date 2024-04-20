import { SpinnerOverlay, SpinnerContainer } from './loadingSpinner.styles';

const LoadingSpinner: React.FC = () => (
    <SpinnerOverlay>
        <SpinnerContainer />
    </SpinnerOverlay>
);

export default LoadingSpinner;