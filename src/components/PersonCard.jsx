import {
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Link,
} from "@material-ui/core";
import Data from "../store/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router";
import { usePersonStyles } from "../styles/styles";

const Person = observer(() => {
  const { id } = useParams();
  const c = Data.character;
  const classes = usePersonStyles();

  useEffect(() => {
    Data.fetchCharacter(id);
  }, [id]);

  return (
    <div>
      {c && (
        <div>
          <div className={classes.root} key={c.id}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  <img className={classes.image} src={c.image} alt="Hero pic" />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  <TableContainer className={classes.table}>
                    <Table size="medium">
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Name
                          </TableCell>
                          <TableCell align="right">{c.name}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Height
                          </TableCell>
                          <TableCell align="right">{c.height} m</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Homeworld
                          </TableCell>
                          <TableCell align="right">{c.homeworld}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Born Location
                          </TableCell>
                          <TableCell align="right">{c.bornLocation}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Died Location
                          </TableCell>
                          <TableCell align="right">{c.diedLocation}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Wiki
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2">
                              <Link color="inherit" href={c.wiki}>
                                Click here for more info
                              </Link>
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Typography variant="h6">Affiliations</Typography>
                  <List>
                    {c.affiliations.map((f, i) => (
                      <ListItem className={classes.listItem} key={i}>
                        <ListItemText>{f}</ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </div>
      )}
    </div>
  );
});

export default Person;
