import { Paper, TableCell, tableCellClasses, TableRow } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";

import { styles } from "constants/styles";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: styles.theme.primaryColor,
    color: styles.tableCell.color,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const AmountBox = styled(Paper)(({ theme }) => ({
  backgroundColor: styles.amountBox.backgroundColor,
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: "white",
}));

const useStyles = makeStyles(() => ({
  addExpense: {
    "&:hover": {
      color: "white",
      background: `${styles.theme.primaryColor} !important`,
    },
  },
  list: {
    borderRadius: 10,
    backgroundColor: styles.list.backgroundColor,
    minHeight: "444px",
  },
  menuLink: {
    color: "black !important",
    textDecoration: "none !important",
  },
}));

export { useStyles, StyledTableCell, StyledTableRow, AmountBox };
