import { TableCell, TableRow, tableCellClasses, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#E31C79",
    color: theme.palette.common.white,
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

const RecievedAmount = styled(Paper)(({ theme }) => ({
  backgroundColor: "#E31C79",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: "white",
}));

const RemainingAmount = styled(Paper)(({ theme }) => ({
  backgroundColor: "#607d8b",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: "white",
}));

const TotalAmount = styled(Paper)(({ theme }) => ({
  backgroundColor: "#212121",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: "white",
}));

export {
  StyledTableCell,
  StyledTableRow,
  RecievedAmount,
  RemainingAmount,
  TotalAmount,
};
