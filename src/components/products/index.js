import { Container, Grid, useMediaQuery, useTheme } from "@mui/material"
import { products } from "../../data/index"
import SingleProduct from "./singleProduct";
import SingleProductDesktop from "./singleProductDesktop";
export default function Products() {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    const renderProducts = products.map(product => (
        <Grid item id={product.id} display="flex" xs={2} sm={4} md={4} flexDirection={'column'} alignItems="center" >
            {matches ? <SingleProduct product={product} matches={matches} /> : <SingleProductDesktop product={product} matches={matches} />}
        </Grid>
    ))

    return (
        <Container>
            <Grid container justifyContent="center" columns={{ xs: 2, sm: 8, md: 12 }} spacing={{ xs: 2, md: 3 }} sx={{ margin: '20px 4px 10px 4px' }}>
                {renderProducts}
            </Grid>
        </Container>
    )
}
