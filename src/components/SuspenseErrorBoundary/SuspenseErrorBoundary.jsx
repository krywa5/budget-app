import { Button, LoadingIndicator } from 'components';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import queryCache from 'data/query/queryCache';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
        this.errorMessage = 'Something went wrong.';
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, errorInfo);
        console.error(error, errorInfo);
    }

    tryAgain = () => {
        this.setState({ hasError: false });
        queryCache.invalidateQueries(['budget'], {
            refetchInactive: true,
        })
    }

    render() {
        return (
            <React.Suspense fallback={<LoadingIndicator />}>
                {this.state.hasError ? (
                    <>
                        <p role="alert">{this.props.t(this.errorMessage)}</p>
                        <Button onClick={this.tryAgain}>{this.props.t('Try again')}</Button>
                    </>
                ) : (
                        <>
                            {this.props.children}
                        </>
                    )
                }
            </React.Suspense>
        )
    }
}

export default withTranslation()(ErrorBoundary);