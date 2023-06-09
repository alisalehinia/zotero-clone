import { Facebook, Instagram, SendRounded, Twitter } from "@mui/icons-material";
import { Box, Button, Grid, List, ListItemText, Stack, Typography } from "@mui/material";
import { FooterTitle, SubscribeTF } from "../../styles/footer";
import { Colors } from "../../styles/theme"

export default function Footer() {
    return (
        <Box
            sx={{
                background: Colors.shaft,
                color: Colors.white,
                p: { xs: 4, md: 10 },
                pt: 12, pb: 12,
                fontSize: { xs: "12px", md: "14px" }
            }}>
            <Grid container spacing={2} justifyContent="center">
                <Grid item md={6} lg={4}>
                    <FooterTitle variant="body1">
                        About Us
                    </FooterTitle>
                    <Typography variant="caption2" >
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit eos ratione iusto praesentium, ab sequi unde minima nobis necessitatibus veritatis.
                    </Typography>
                    <Box sx={{ mt: 4, color: Colors.dove_gray }}>
                        <Facebook sx={{ mr: 1 }} />
                        <Twitter sx={{ mr: 1 }} />
                        <Instagram sx={{ mr: 1 }} />
                    </Box>
                </Grid>
                <Grid item md={6} lg={2}>
                    <FooterTitle variant="body1">
                        information
                    </FooterTitle>
                    <List>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2">
                                About Us
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2">
                                Order Tracking
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2">
                                Privacy &amp; Policy
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2">
                                Terms &amp; Conditions
                            </Typography>
                        </ListItemText>
                    </List>
                </Grid>
                <Grid item md={6} lg={2}>
                    <FooterTitle variant="body1">
                        my account
                    </FooterTitle>
                    <List>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2">
                                Login
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2">
                                My Cart
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2">
                                My account
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2">
                                WishList
                            </Typography>
                        </ListItemText>
                    </List>
                </Grid>
                <Grid item md={6} lg={4}>
                    <FooterTitle variant="body1">
                        newsletter
                    </FooterTitle>
                    <Stack>
                        <SubscribeTF color="primary" label="Email Address" variant="standard" />
                        <Button startIcon={<SendRounded sx={{ color: Colors.white }} />}
                            sx={{ mt: 4, mb: 4 }}
                            variant="contained"
                        >
                            Subscribe
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}