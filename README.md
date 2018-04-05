# React Lazy Responsive Image
A React Component to lazy load responsive images

## Example

```shell 
$ npm install react-lazy-responsive-image --save
```

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import LazyResponsiveImage from 'react-lazy-responsive-image';
  
ReactDOM.render(
  <LazyResponsiveImage
      src="foo@default.jpg"
      className="test-class"
      sources={{
          small: 'foo@small.jpg',
          medium: 'foo@medium.jpg',
          large: 'foo@large.jpg|foo@large-2x.jpg',
      }}
      breakpoints={{
          small: 600,
          medium: 900,
          large: 1200,
      }}
  />,
  document.getElementById('root')
);
```

