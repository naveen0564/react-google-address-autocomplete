import React from "react";
import makeAsyncScriptLoader from "react-async-script";
import Autocomplete from "./Autocomplete";

function withScript(url, WrappedComponent) {
  const LoadingElement = props => {
    return <div>Loading...</div>;
  };

  class Wrapper extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        scriptLoaded: false
      };
    }
    render() {
      const AsyncScriptLoader = makeAsyncScriptLoader(url)(LoadingElement);
      if (this.state.scriptLoaded) {
        return <WrappedComponent />;
      }
      return (
        <AsyncScriptLoader
          asyncScriptOnLoad={() => {
            this.setState({ scriptLoaded: true });
          }}
        />
      );
    }
  }
  return Wrapper;
}

const GoogleMapsUrl = `https://maps.googleapis.com/maps/api/js?key={your-google-key}&libraries=places`;
const App = withScript(GoogleMapsUrl, Autocomplete);

export default App;