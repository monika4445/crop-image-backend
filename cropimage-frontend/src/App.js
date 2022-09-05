import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { MainComponent } from './components/mainComponent';
import { cropImageThunk, uploadImageThunk, getCroppedImageThunk, setToFetching } from './redux/image-reducer';

const App = (props) => {
  return (
    <MainComponent
      aboutImage = {props.aboutImage}
      isFetching = {props.isFetching}
      cropProperties = {props.cropProperties}
      setImagePath = {props.setImagePath}
      cropImage = {props.cropImage}
      getResult = {props.getResult}
      setToFetching = {props.setToFetching}
    />)
}

const mapStateToProps = (state) => {
  return {
    aboutImage: state.image.aboutImage,
    cropProperties: state.image.cropProperties,
    isFetching: state.image.isFetching
  }
}

export default connect(mapStateToProps, {
  setImagePath: uploadImageThunk,
  cropImage: cropImageThunk,
  getResult: getCroppedImageThunk,
  setToFetching
})(App)
