import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    BlazyWrapper,
    omit,
    transformCase,
    sourceProp,
} from './helpers';

const PLACEHOLDER_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
const IGNORED_PROPS = ['sources', 'breakpoints'];
const LOADED_CLASS = 'b-loaded';

class LazyResponsiveImage extends Component {
  constructor(props) {
    super(props);
    this.loadImage = this.loadImage.bind(this);
    this.state = { loaded: false };
  }
  
  getMediaSources() {
    return Object.keys(this.props.sources).reduce((result, k) => {
      result[sourceProp(k)] = this.props.sources[k];
      return result;
    }, {});
  }

  loadImage() {
    const config = {
      breakpoints: Object.keys(this.props.breakpoints)
      .filter(k => this.props.sources[k])
      .map(k => ({
        width: this.props.breakpoints[k],
        src: sourceProp(k),
      })),
    };

    const blazy = BlazyWrapper.getInstance(config);

    setTimeout(() => {
      blazy.load(this.refs.image);
      this.setState({ loaded: true });
    });
  }

  componentDidMount() {
    this.loadImage();
  }

  render() {
    const sources = this.getMediaSources();
    const injectingProps = omit(this.props, IGNORED_PROPS);
    const loadedClass = this.state.loaded ? LOADED_CLASS : '';
    return (
      <img
        {...injectingProps}
        {...sources}
        className={`b-lazy ${this.props.className} ${loadedClass}`}
        ref="image"
        src={PLACEHOLDER_IMAGE}
        data-src={this.props.src}
      />
    );
  }
}

const DEFAULT_BREAKPOINTS  = {
  small: 600,
  medium: 900,
  large: 1200,
  huge: 1800,
};

LazyResponsiveImage.defaultProps = {
  src: '',
  className: '',
  sources: {},
  breakpoints: DEFAULT_BREAKPOINTS,
};

LazyResponsiveImage.propTypes = {
  src: PropTypes.string.isRequired,
  sources: PropTypes.instanceOf(Object),
  breakpoints: PropTypes.instanceOf(Object),
  src: PropTypes.string,
};

export default LazyResponsiveImage;
