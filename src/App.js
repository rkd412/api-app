import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

import SafeBrowser from "./components/SafeBrowser";
import PasswordGenerator from "./components/PasswordGenerator";
import ThirdComp from "./components/ThirdComp";

import styles from "./App.module.css";

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
          <Typography>{children}</Typography>
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
            aria-label="Different Security APIs"
          >
            <Tab label="URL Checker" {...a11yProps(0)} />
            <Tab label="Password Generator" {...a11yProps(1)} />
            <Tab label="Third Component" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <SafeBrowser />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PasswordGenerator />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ThirdComp />
        </TabPanel>
      </Box>
    </Grid>
  );
};

export default App;
