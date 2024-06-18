import '../../styles/globals.css';
import '../../styles/scss/_app.scss';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from '../_redux/store'
// import { createWrapper } from 'next-redux-wrapper';


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store} >
      <Component {...pageProps} />
    </Provider>
  )
}


// makeStore function that returns a new store for every request
// const makeStore = () => store;
// const wrapper = createWrapper(makeStore);

// withRedux wrapper that passes the store to the App Component
// export default wrapper.withRedux(MyApp);

export default MyApp;
