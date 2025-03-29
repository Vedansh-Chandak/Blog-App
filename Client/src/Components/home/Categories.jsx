import { Button, Table, TableBody, TableCell, TableHead, TableRow,styled } from "@mui/material";
import { categories } from "../../../constants/Data.js";

const StyledTable = styled(Table)`
border: 1px solid rgba(224, 224, 1);
`
const StyledButton = styled(Button)`
  margin: 20px auto;
  width: 90%;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: #fff;
  padding: 12px 0;
  font-size: 16px;
  font-weight: bold;
  border-radius: 30px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background: linear-gradient(135deg, #0056b3, #004080);
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

const Categories = () => {
  return (
    <>
      <StyledButton variant="contained" color="primary" style={{ marginBottom: "20px" }}>
        Create Blog
      </StyledButton>
      
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>
              All Categories
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </>
  );
};

export default Categories;
