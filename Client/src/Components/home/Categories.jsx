import { Button, Table, TableBody, TableCell, TableHead, TableRow, styled } from "@mui/material";
import { categories } from "../../../constants/Data.js";
import { Link, useSearchParams } from "react-router-dom";

const StyledTable = styled(Table)`
  border: 1px solid rgba(224, 224, 1);
  margin-top: 20px;
`;

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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-weight: bold;
  &:hover {
    color: #0056b3;
  }
`;

const StyledTableRow = styled(TableRow)`
  &:hover {
    background-color: rgba(0, 123, 255, 0.1);
    cursor: pointer;
  }
`;

const Categories = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  return (
    <>
      <StyledLink to={`/create?category=${category || ""}`}>
        <StyledButton variant="contained" color="primary">
          Create Blog
        </StyledButton>
      </StyledLink>
      
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>
              <StyledLink to="/">All Categories</StyledLink>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {categories.map((category) => (
            <StyledTableRow key={category.id}>
              <TableCell>
                <StyledLink to={`/?category=${category.type}`}>
                  {category.type}
                </StyledLink>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </StyledTable>
    </>
  );
};

export default Categories;
