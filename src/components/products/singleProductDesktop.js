import { FavoriteRounded, FitScreenRounded, ShareRounded } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { useState } from "react";
import useDialogModal from "../../hooks/useDialogModal";
import { Product, ProductActionButton, ProductActionsWrapper, ProductAddToCart, ProductFavButton, ProductImage } from "../../styles/products";
import ProductDetail from "../productdetail";
import ProductMeta from "./productMeta";

export default function SingleProductDesktop({ product, matches }) {
    const [showOptions, setShowOptions] = useState(false);
    const [ProductDetailDialog, showProductDetailDialog, closeProductDetailDialog] = useDialogModal(ProductDetail);

    const handleMouseEnter = () => {
        setShowOptions(true);
    }
    const handleMouseLeave = () => {
        setShowOptions(false);
    }
    return (
        <>
            <Product onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <ProductImage src={product.image} />
                <ProductFavButton isFav={0} >
                    <FavoriteRounded />
                </ProductFavButton>
                {
                    showOptions && <ProductAddToCart show={showOptions} variant="contained">
                        Add To Cart
                    </ProductAddToCart>
                }
                <ProductActionsWrapper show={showOptions}>
                    <Stack direction="column">
                        <ProductActionButton>
                            <ShareRounded color="primary" />
                        </ProductActionButton>
                        <ProductActionButton onClick={() => showProductDetailDialog()}>
                            <FitScreenRounded color="primary" />
                        </ProductActionButton>
                    </Stack>
                </ProductActionsWrapper>
            </Product>
            <ProductMeta product={product} matches={matches} />
            <ProductDetailDialog product={product} />
        </>
    )
}