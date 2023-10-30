import { useState } from "react";
import { Valoracion } from '../../@types/Valoracion';
import { Site } from "../../@types/Site";

const useMySites = () => {
    const [myComments, setMyComments] = useState<Site[]>([]);
    const [myRatings, setMyRatings] = useState<{ valoracion: Valoracion, site: Site }[]>([]);
    const [myPhotos, setMyPhotos] = useState<Site[]>([]);

    return { myComments, setMyComments, myRatings, setMyRatings, myPhotos, setMyPhotos };
}

export default useMySites;