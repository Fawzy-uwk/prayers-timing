import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"


function Prayer({ name, time, src }) {
    return (
        <div className="flex items-center justify-center">
            <Card sx={{ maxWidth: 192 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        sx={{
                            height: 150,
                            objectFit: "cover",

                            width: 400,
                        }}
                        image={src}
                        alt="Prayer Image"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h4" className="font-bold" component="h4">
                            {name}
                        </Typography>
                        <Typography variant="h3" c sx={{ color: 'text.secondary' }}>
                            {time}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>


        </div>
    )
}

export default Prayer
