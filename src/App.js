import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

import URLChecker from "./components/URLChecker";
import PasswordGenerator from "./components/PasswordGenerator";
import EmailChecker from "./components/EmailChecker";

console.log(process.env.REACT_APP_GOOGLE_API_KEY);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const App = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid
      container
      spacing={0}
      align="center"
      justify="center"
      direction="column"
      height="100vh"
    >
      <Box
        sx={{
          width: "auto",
          height: "50vh",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
          >
            <Tab label="URL Checker" {...a11yProps(0)} />
            <Tab label="Password Generator" {...a11yProps(1)} />
            <Tab label="Email Checker" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <URLChecker />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PasswordGenerator />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <EmailChecker />
        </TabPanel>
      </Box>
    </Grid>
  );
};

export default App;
