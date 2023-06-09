import { CloseRounded } from "@mui/icons-material";
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Slide, styled, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Product, ProductImage } from "../../styles/products";
import { Colors } from "../../styles/theme"
import IncDec from "../ui";

function SlideTransition(props) {
    return <Slide direction="down" {...props} />
}

const ProductDetailWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    padding: theme.spacing(4)
}))

const ProductDetailInfoWrapper = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    maxWidth: 500,
    lineHeight: 1.5
}))

export default function ProductDetail({ open, onClose, product }) {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Dialog
            TransitionComponent={SlideTransition}
            variant="permanent"
            open={open}
            fullScreen
        >
            <DialogTitle sx={{ background: Colors.secondary }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    product Title
                    <IconButton onClick={onClose}>
                        <CloseRounded />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <ProductDetailWrapper flexDirection={matches ? "column" : "row"}>
                    <Product sx={{ mr: 4 }}>
                        <ProductImage src={product.image} />
                    </Product>
                    <ProductDetailInfoWrapper>
                        <Typography variant="subtitle1">
                            SKU 253
                        </Typography>
                        <Typography variant="subtitle1">
                            Availability: 5 in Stock
                        </Typography>
                        <Typography variant="h4" lineHeight={2}>
                            {product.image}
                        </Typography>
                        <Typography variant="body">
                            {product.description}
                            {product.description}
                            {product.description}
                        </Typography>
                        <Box sx={{ mt: 4 }} display="flex" alignItems="center" justifyContent="space-between">
                            <IncDec />
                            <Button variant="contained" >Add To Cart</Button>
                        </Box>
                    </ProductDetailInfoWrapper>
                </ProductDetailWrapper>
            </DialogContent>
        </Dialog>
    )
}