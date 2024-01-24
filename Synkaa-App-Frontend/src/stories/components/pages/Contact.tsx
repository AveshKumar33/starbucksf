// import { Box  } from "@mui/material";
import React from "react";
import { SideBar } from "../organisms/SideBar";
import { Header } from "../organisms/Header";
// import Image from "next/image";
// import QrCodeIcon from "../../../../src/assets/images/qrCodeIcon.svg";
// import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import SearchIcon from '@mui/icons-material/Search'; 
// import Tooltip from '@mui/material/Tooltip';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';

// import FilterListIcon from '@mui/icons-material/FilterList';
import IosShareIcon from '@mui/icons-material/IosShare';
import { visuallyHidden } from '@mui/utils';
import { Button,  Paper, TextField, ThemeProvider,  InputAdornment, } from "@mui/material";
import theme from "../../../theme/theme";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';


  interface Data {
    phonenumber: number;
    latestvist: number;
    createdon: number;
    name: string;
    tags: string;
    add: string;
  }

  function createData(
    name: string,
    phonenumber: number,
    createdon: number,
    latestvist: number,
    tags: string,
    add: string,
  ): Data {
    return {
      name,
      phonenumber,
      createdon,
      latestvist,
      tags,
      add
    };
  }
  
  const rows = [
    createData('Cupcake', 986766465367, 3.7, 67, 'newuser', ''),
    createData('Donut', 986766465367, 25.0, 51, 'newuser', ''),
    createData('Eclair', 986766465367, 16.0, 24, 'newuser', ''),
    createData('Frozen', 986766465367, 159, 6.0, 'newuser' , ''),
    createData('Gingerbread', 986766465367, 16.0, 49,'newuser', ''),
    createData('Honeycomb', 986766465367, 3.2, 87, 'newuser', ''),
    createData('Ice cream', 986766465367, 237, 9.0,'newuser', ''),
    createData('Jelly Bean', 986766465367, 0.0, 94, 'newfuser', ''),
    createData('KitKat', 986766465367, 26.0, 65, 'newuser', ''),
    createData('Lollipop', 986766465367, 0.2, 98, 'newuser', ''),
    createData('Marshmallow', 986766465367, 0, 81,'newuser', ''),
    createData('Nougat', 986766465367, 19.0, 9, 'newuse', ''),
    createData('Oreo', 986766465367, 18.0, 63, 'newuser', ''),
  ];
 
  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  type Order = 'asc' | 'desc';

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
  ) {
    return order === 'desc'
      ? (a: any, b: any) => descendingComparator(a, b, orderBy)
      : (a: any, b: any) => -descendingComparator(a, b, orderBy);
  }

  function stableSort<T>(array: readonly T[], comparator: any) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
  }
 
  const headCells: readonly HeadCell[] = [
    {
      id: 'name',
      numeric: false,
      disablePadding: false,
      label: 'Name',
    },
    {
      id: 'phonenumber',
      numeric: true,
      disablePadding: false,
      label: 'Phone Number',
    },
    {
      id: 'createdon',
      numeric: true,
      disablePadding: false,
      label: 'Created On',
    },
    {
      id: 'latestvist',
      numeric: true,
      disablePadding: false,
      label: 'Latest Visit',
    },
    {
      id: 'tags',
      numeric: true,
      disablePadding: false,
      label: 'Tags',
    },
    {
      id: 'add',
      numeric: false,
      disablePadding: false,
      label: '',
    },
  ];
  
  interface EnhancedTableProps {
    numSelected: number;
    // eslint-disable-next-line no-unused-vars
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    // eslint-disable-next-line no-unused-vars
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
  }
  
  function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler =
      (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox" sx={{textAlign:'center'}}>
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'left' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{fontWeight:'600' , fontSize:'16px'}}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  interface EnhancedTableToolbarProps {
    numSelected: number;
  }

  function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;
  
    return (
      <Toolbar
        sx={{
          px: '32px',
          py:'24px',
           marginBottom: '24px',
          ...(numSelected > 0 && {
          }),
          backgroundColor: '#fff',
          borderRadius:'8px',
          height:"72px"
          
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%', fontWeight:'600' }}
            color="inherit"
            variant="h6"
            component="div"
          >
           Contact List
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%', fontWeight:'600'}}
            color="inherit"
            variant="h6"
            component="div"
          >
            Contact List
          </Typography>
        )}
        {numSelected > 0 ? (
        <Box sx={{display:'flex'}}>
        <TextField
        sx={{marginRight:'.5rem', flex: 1, minWidth:'200px' , borderRadius:'8px',  }}
        placeholder="Search"
        size="small"
        inputProps={{ 'aria-label': 'search google maps' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
            <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button variant="contained" className="disable_btn"  disableElevation startIcon={<IosShareIcon />} sx={{marginRight:'.5rem', borderRadius:'8px', height:'36px'}}>Export</Button>
      <Button variant="outlined" sx={{ borderRadius:'8px', height:'36px', }}  startIcon={<DeleteIcon />}>Delete</Button>
     </Box>
        ) : (
          <Paper
          elevation={0}
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center'}}
        >
           <Box sx={{display:'flex'}}>
            <TextField
            sx={{marginRight:'.5rem', flex: 1, minWidth:'200px' , borderRadius:'8px',  }}
            placeholder="Search"
            size="small"
            inputProps={{ 'aria-label': 'search google maps' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" className="disable_btn" disabled disableElevation startIcon={<IosShareIcon />} sx={{marginRight:'.5rem', backgroundColor:'#83CAFD', borderRadius:'8px', height:'36px'}}>Export</Button>
          <Button variant="outlined" sx={{ borderRadius:'8px', height:'36px', }} disabled startIcon={<DeleteIcon />}>Delete</Button>
         </Box>
        </Paper>
        )}
      </Toolbar>
    );
  }

  export const Contact: React.FC = () => {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('phonenumber');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page] = React.useState(0);
    const [dense] = React.useState(false);
    const [rowsPerPage] = React.useState(5);


    const handleRequestSort = (
      event: React.MouseEvent<unknown>,
      property: keyof Data,
    ) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
    

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        const newSelected = rows.map((n) => n.name);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    };
  
    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected: readonly string[] = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
  
      setSelected(newSelected);
    };
    
  
    const isSelected = (name: string) => selected.indexOf(name) !== -1;
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  
    const visibleRows = React.useMemo(
      () =>
        stableSort(rows, getComparator(order, orderBy)).slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage,
        ),
      [order, orderBy, page, rowsPerPage],
    );

    return(
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex", width: "100%", height: "100vh", flexGrow: "1", bgcolor: "#F0F6FE", }}>
        <Box sx={{ flexBasis: "60px" }}>
            <SideBar />
        </Box>
        <Box sx={{ flex: 1, }}>
            <Header heading="Contacts" dashBoard={false}/>
            <Box sx={{ p: "24px", display: "flex", flexDirection: "column", gap: "24px", marginTop: '68px'  }}>
      <Box sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer sx={{backgroundColor: '#fff'}}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.name)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox" sx={{width:'113px', textAlign:'center'}}>
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      sx={{fontWeight:'600', fontSize:'16px', padding:'16px'}}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.phonenumber}</TableCell>
                    <TableCell align="left">{row.createdon}</TableCell>
                    <TableCell align="left">{row.latestvist}</TableCell>
                    <TableCell align="left" padding="none">
                    <Stack direction="row" spacing={1}>
                    <Chip label={row.tags} />
                     </Stack>
                     </TableCell>
                     <TableCell align="left">
                        <AddIcon sx={{color:'#707070'}} />
                     </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"`
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Box>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}

            </Box>
        </Box>
    </Box>
    </ThemeProvider>
   )
}
