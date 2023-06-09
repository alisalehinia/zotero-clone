import { FavoriteRounded, FitScreenRounded, ShareRounded } from "@mui/icons-material";
import { Stack } from "@mui/material";
import useDialogModal from "../../hooks/useDialogModal";
import { Product, ProductActionButton, ProductActionsWrapper, ProductAddToCart, ProductFavButton, ProductImage } from "../../styles/products";
import ProductDetail from "../productdetail";
import ProductMeta from "./productMeta";

export default function SingleProduct({ product, matches }) {
    const [ProductDetailDialog, showProductDetailDialog, closeProductDetailDialog] = useDialogModal(ProductDetail);

    return (
        <>
            <Product>
                <ProductImage src={product.image} />
                <ProductMeta product={product} matches={matches} />
                <ProductActionsWrapper>
                    <Stack direction="row">
                        <ProductFavButton isFav={0}>
                            <FavoriteRounded />
                        </ProductFavButton>
                        <ProductActionButton>
                            <ShareRounded color="primary" />
                        </ProductActionButton>
                        <ProductActionButton onClick={() => showProductDetailDialog()}>
                            <FitScreenRounded color="primary" />
                        </ProductActionButton>
                    </Stack>
                </ProductActionsWrapper>
            </Product>
            <ProductAddToCart variant="contained">
                Add To Cart
            </ProductAddToCart>
            <ProductDetailDialog product={product} />
        </>
    )
}