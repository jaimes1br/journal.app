import { ImageList, ImageListItem }from '@mui/material';

export const ImageGallery = ({ images }) => {

    return (
    <ImageList sx={{ width: '100%', height: 500 }} cols={ 4 } rowHeight={ 200 }>
        {
            images.map(( item,i ) => (
                <ImageListItem key={item}>
                    <img
                        src={`${item}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={'image'+ i}
                        loading="lazy"
                    />
                </ImageListItem>
        ))}
    </ImageList>
  )
}




