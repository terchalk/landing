import axios from 'axios';
import config from './config';

let data = null; // global data store

function updateData() {
  const url = `http://${config.SERVER_HOST}:${config.SERVER_PORT}/data`;

  let p = axios.get(url, { })
    .then(res => {
      data = res.data.data;
      return data;
    });

  return p;
}

function reset() {
  console.log('reset');
  const url = `http://${config.SERVER_HOST}:${config.SERVER_PORT}/reset`;

   let p = axios.post(url, { })
    .then(res => {
      return null;
    });

  return p;
}

function bid(listingId, bidPrice) {
  const url = `http://${config.SERVER_HOST}:${config.SERVER_PORT}/bids`;

   let p = axios.post(url, { listingId, bidPrice })
    .then(res => {
      return null;
    });

  return p;
}

function getWinningBid(listing) {
  return data ? data.bids.filter(x => x.listingId == listing.id)[0] : null;
}

function verifyBid(bidId) {
  const url = `http://${config.SERVER_HOST}:${config.SERVER_PORT}/verify/bid`;

   let p = axios.post(url, { bidId })
    .then(res => {
      if (!res.data.success) {
        throw new Error(res.data.error);
      }

      return res.data.data;
    });

  return p;
}

function verifyItemListing(listingId) {
  const url = `http://${config.SERVER_HOST}:${config.SERVER_PORT}/verify/listing`;

   let p = axios.post(url, { listingId })
    .then(res => {
      if (!res.data.success) {
        throw new Error(res.data.error);
      }

      return res.data.data;
    });

  return p;
}

export { updateData, getWinningBid, verifyItemListing, reset, bid, verifyBid };
