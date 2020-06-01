import React, {Suspense} from 'react';
import {useImage} from 'react-image'
import {Img} from 'react-image'
import Loading from './Loading';

const LazyImage = (props) => {
    const {src} = useImage({
        srcList: props.src,
      })

    return(
        <Suspense>
            <Img src={src}
                  loader={Loading}
                  alt={props.alt} />
        </Suspense>
    );
}

export default LazyImage;
