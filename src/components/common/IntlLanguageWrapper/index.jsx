import { Fragment, useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';

import translate from '@/translate';

function IntlLanguageWrapper({ children, language }) {
    const [messages, setMessages] = useState(translate[language]);

    useEffect(() => {
        setMessages(translate[language]);
    }, [language]);

    return (
        <Fragment>
            <IntlProvider locale={language} messages={messages}>
                {children}
            </IntlProvider>
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        language: state.language.language, // Access the combined language state from the intlReducer
    };
};

export default connect(mapStateToProps)(IntlLanguageWrapper);
