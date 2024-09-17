import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { TextField, Autocomplete, MenuItem, Typography } from "@mui/material";
import axios from "axios";
import { ip } from "../constants/ip";

// function createData(id, image, title, quantity, author, publisher, barcode, price) {
//   return {
//     id,
//     image,
//     title,
//     quantity,
//     author,
//     publisher,
//     barcode,
//     price,
//   };
// }

const SearchField = ({ handelBarcode, handelNSearch, info, type }) => {
  const [searchText, setSearchText] = useState("");
  const [text, setText] = useState("");
  const [rows, setRows] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filteredRows, setFilteredRows] = useState(rows);
  const [hoveredImage, setHoveredImage] = useState(null);
  useEffect(() => {
    if (info.type === "BR" || info.type === "BRe") {
      fetchDataStock();
    } else if (info.type === "BT") {
      fetchDataStockBt();
    } else if (
      info.type === "BL" ||
      info.type === "BLF" ||
      info.type === "F" ||
      info.type === "Ticket" ||
      info.type === "Devis" ||
      info.type === "BC"
    ) {
      fetchDataChannel();
    }
  }, [refresh]);
  console.log(info, type);

  const mergeAndSortByDate = (exitNotes, receiptNotes) => {
    const combined = [
      ...exitNotes.map((item) => ({
        ...item,
        type: "exit",
        date: new Date(item.exitDate),
        id: `exit-${item.id}`,
      })),
      ...receiptNotes.map((item) => ({
        ...item,
        type: "receipt",
        date: new Date(item.receiptDate),
        id: `receipt-${item.id}`,
      })),
    ];

    return combined.sort((a, b) => a.date - b.date);
  };
  const fetchDataChannel = async () => {
    const findStockResponse = await axios.get(`${ip}/selling/${info.sender}`);
    console.log("this is me ", findStockResponse.data);
    if (findStockResponse.data) {
      const response = await axios.get(
        `${ip}/stocks/${findStockResponse.data.idStock}`
      );
      console.log("hello ", response.data.data.stockArticle);
      const result = response.data.data.stockArticle.reduce(
        (acc, item) => {
          acc.data.push({
            id: item.articleId,
            name: item.article.title,
            code: item.article.code,
            image: item.article?.cover?.path,
            author: null,
            publisher: null,
            quantity: item.quantity,
            price:0
          });
          acc.ids.push(item.articleId)
          return acc;
        },
        {
          data: [],
          ids: [],
        }
      );

      const responsePriceByChannel = await axios.get(
        `http://localhost:3000/price-By-Channel/getAll`,
        { params: { salesChannelIds: result.ids } }
      );

      result.data.forEach((article) => {
        const priceData = responsePriceByChannel.data.find(
          (priceItem) => priceItem.idArticle === article.id
        );
        if (priceData) {
          article.price = priceData.price;
        }
      });
      console.log("result", result);
      setRows(result.data);
    }
  };
  const fetchDataStock = async () => {
    const response = await axios.get(`${ip}/stocks/${info.receiver}`);
    let params={take:5}
    if(text) params['text']=text
    const findArticleResponse = await axios.get(`${ip}/articles/getAll`,{params});
    console.log("this is me ", findArticleResponse.data.data);
    const result = findArticleResponse.data.data.reduce((acc, item) => {
      
      acc.push({
        id: item.id,
        name: item.title,
        code: item.code,
        image: item.cover&&item.cover.path,
        author: item.articleByAuthor.length?item.articleByAuthor[0].author.nameAr:null,
        publisher: item.articleByPublishingHouse.length?item.articleByPublishingHouse[0].publishingHouse.nameAr:null,
        // quantity: item.quantity,
      });
      return acc;
    }, []);
    setRows(result);
  };
  const fetchDataStockBt = async () => {
    const response = await axios.get(`${ip}/stocks/${info.sender}`);
    console.log("hhh", response.data.data.stockArticle);
    const result = response.data.data.stockArticle.reduce((acc, item) => {
      acc.push({
        id: item.articleId,
        name: item.article.title,
        code: item.article.code,
        image: item.article.cover.path,
        author: null,
        publisher: null,
        quantity: item.quantity,
      });
      return acc;
    }, []);
    setRows(result);
  };
  const handleInputChange = (event, value) => {
    console.log(value,'test here')
    setSearchText(value);
  };
  const handleInputsearch = (event) => {
    console.log(event.target.value,'test here',)
    setText(event.target.value);
    setRefresh(!refresh)
  };

  function includesAll(arr, values) {
    return values.every((value) =>
      arr.some((element) => element.includes(value))
    );
  }

  const handelNormalSearch = (event, value) => {
    console.log(value,'before condition');
    if (value) {
      event.target.value = "";
      console.log(value,'after condition');
      
      handelNSearch(event, value);
      setText("")
    }
  };

  const handleMouseEnter = (image) => {
    setHoveredImage(image);
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };

  return (
    <tr style={{ width: "100%" }}>
      <td colSpan={6}>
        <div
          className="d-flex gap-3 align-items-center"
          style={{ width: "100%" }}
        >
          <div style={{ width: "25%" }}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Bar Code"
                onChange={(event) => handelBarcode(event, rows)}
              />
              <button className="btn btn-outline-secondary" type="button">
                <i className="bi bi-upc-scan"></i>
              </button>
            </div>
          </div>
          <div style={{ width: "70%" }}>
            <Autocomplete
              sx={{ width: "100%" }}
              freeSolo
              inputValue={searchText}
              onInputChange={handleInputChange}
              options={rows}
              onChange={handelNormalSearch}
              getOptionLabel={(option) => ``}
              filterOptions={(options) => options}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  fullWidth
                  placeholder="Search ..."
                  onChange={handleInputsearch}
                />
              )}
              renderOption={(props, option) => (
                <MenuItem {...props} key={option.id}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={option.image}
                      alt="img"
                      style={{ width: 50, cursor: "pointer" }}
                      onMouseEnter={() => handleMouseEnter(option.image)}
                      onMouseLeave={handleMouseLeave}
                    />
                    <div className="ms-2">
                      <Typography variant="body1">{`${option.name}`}</Typography>
                    </div>
                    {option.price!==0 && (
                      <div className="ms-2">
                        <Typography variant="body1">{` | ${option.price} DT`}</Typography>
                      </div>
                    )}
                    <div className="ms-2">
                      <Typography variant="body1">{` | ${option.quantity}`}</Typography>
                    </div>
                  </div>
                </MenuItem>
              )}
            />
          </div>
        </div>
        {hoveredImage && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              padding: "20px",
              borderRadius: "10px",
              zIndex: 1500,
            }}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={hoveredImage}
              alt="Hover Preview"
              style={{ width: "300px", height: "auto" }}
            />
          </div>
        )}
      </td>
    </tr>
  );
};

export default SearchField;
