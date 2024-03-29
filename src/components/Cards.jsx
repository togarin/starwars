import { useHistory } from "react-router-dom";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Checkbox,
} from "@material-ui/core/";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import StarsIcon from "@material-ui/icons/Stars";
import Data from "../store/store";
import { observer } from "mobx-react-lite";
import { Star } from "@material-ui/icons";
// import noname from "../img/star-wars.jpeg";
import { useCardsStyles } from "../styles/styles";

const Cards = observer(() => {
  const history = useHistory();
  const classes = useCardsStyles();
  const p = Data.resultList;

  return (
    <div className={classes.root}>
      <ImageList cols={4} rowHeight="300" className={classes.imageList}>
        {p.map((_) => (
          <ImageListItem key={_.id}>
            <img className={classes.image} src={_.image} alt={`Hero pic`} />
            <ImageListItemBar
              title={_.name}
              actionIcon={
                <IconButton
                  onClick={() => history.push("/character/" + _.id)}
                  aria-label={`info about ${_.name}`}
                  className={classes.icon}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
            <Checkbox icon={<StarsIcon />} checkedIcon={<Star />} />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
});

export default Cards;
