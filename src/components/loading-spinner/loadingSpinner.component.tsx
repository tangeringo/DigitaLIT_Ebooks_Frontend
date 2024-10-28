import { ThemeProvider } from 'styled-components';
import { SpinnerOverlay, SpinnerContainer } from './loadingSpinner.styles';
import { BaseBackgroundContainer } from '../../styles/styles.global';
import { ThemeType } from '../../data/types/types.global';

const LoadingSpinner: React.FC<{theme: ThemeType}> = ({ theme }) => (
    <ThemeProvider theme={theme}>
        <BaseBackgroundContainer>
            <SpinnerOverlay>
                <SpinnerContainer />
            </SpinnerOverlay>
        </BaseBackgroundContainer>
    </ThemeProvider>
        
);

export default LoadingSpinner;