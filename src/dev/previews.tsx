import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import App from "../app/App";
import {Login} from "../features/Login/Login";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree/>}>
      <ComponentPreview path="/App">
        <App/>
      </ComponentPreview>
      <ComponentPreview path="/Login">
        <Login/>
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;