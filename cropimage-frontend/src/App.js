import { connect } from 'react-redux';
import './App.css';
import { MainComponent } from './components/mainComponent';
import { cropImageThunk, uploadImageThunk } from './redux/image-reducer';

const App = (props) => {
  return (
    <MainComponent
      aboutImage = {props.aboutImage}
      cropProperties = {props.cropProperties}
      setImagePath = {props.setImagePath}
      cropImage = {props.cropImage}
    />)
}

const mapStateToProps = (state) => {
  return {
    aboutImage: state.image.aboutImage,
    cropProperties: state.image.cropProperties
  }
}


export default connect(mapStateToProps, {
  setImagePath: uploadImageThunk,
  cropImage: cropImageThunk,
  uploadImageThunk
})(App)
