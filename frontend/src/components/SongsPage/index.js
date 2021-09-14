import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getSongs } from "../../store/songs";

function SongsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSongs());
  }, [])

  return null;
}

export default SongsPage;
