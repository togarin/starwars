import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  InputAdornment,
  TextField,
} from "@material-ui/core/";
import SearchIcon from "@material-ui/icons/Search";
import CancelIcon from "@material-ui/icons/Cancel";

import StarsIcon from "@material-ui/icons/Star";
import { useNavBarStyles } from "../styles/styles";
import { observer } from "mobx-react-lite";
import Data from "../store/store";

const NavBar = observer(() => {
  const classes = useNavBarStyles();
  const [isVisible, setIsVisible] = useState(false);

  const handleReset = () => {
    setIsVisible(false);
    Data.resetSearchString();
  };

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Material-UI
          </Typography>
          <div className={classes.search}>
            <TextField
              placeholder="Live search…"
              value={Data.searchString}
              // classes={{
              //   root: classes.inputRoot,
              //   input: classes.inputInput,
              // }}
              onChange={(e) => {
                Data.setSearchString(e.target.value);
                setIsVisible(true);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: isVisible ? (
                  <InputAdornment position="start">
                    <IconButton size="small" onClick={handleReset}>
                      <CancelIcon />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              }}
              onBlur={handleReset}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <StarsIcon />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
});

export default NavBar;
