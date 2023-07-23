import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

interface OwnerFragment {
  name: string;
  username: string;
  url: string;
  thumbnailUrl: string;
  badge?: "verified";
}

const pewdiepie: OwnerFragment = {
  name: "PewDiePie",
  username: "pewdiepie",
  url: "/@pewdiepie",
  thumbnailUrl: "https://picsum.photos/id/237/200/200",
};

interface VideoFragment {
  id: string;
  title: string;
  thumbnailUrl: string;
  url: string;
  owner: OwnerFragment;
  length: string;
  viewCount: number;
  publishedAt: string;
}

const videos: VideoFragment[] = [
  {
    id: "1",
    title: "Adventures of Don Juan",
    owner: pewdiepie,
    thumbnailUrl: "http://dummyimage.com/720x404.png/5fa2dd/ffffff",
    url: "/watch?v=1",
    length: "P0H9M43S",
    viewCount: 291,
    publishedAt: "2021-07-17T23:11:24Z",
  },
  {
    id: "2",
    title: "Jungle Man-Eaters",
    owner: pewdiepie,
    thumbnailUrl: "http://dummyimage.com/720x404.png/cc0000/ffffff",
    url: "/watch?v=2",
    length: "P0H9M43S",
    viewCount: 6912,
    publishedAt: "2022-04-20T13:14:03Z",
  },
  {
    id: "3",
    title:
      "Oppenheimer movie review - the reviews don't do it justice it was truly a masterpiece",
    owner: pewdiepie,
    thumbnailUrl: "http://dummyimage.com/720x404.png/5fa2dd/ffffff",
    url: "/watch?v=3",
    length: "P0H9M43S",
    viewCount: 636087,
    publishedAt: "2023-02-23T18:37:38Z",
  },
  {
    id: "4",
    title: "Jetsons: The Movie",
    owner: pewdiepie,
    thumbnailUrl: "http://dummyimage.com/720x404.png/5fa2dd/ffffff",
    url: "/watch?v=4",
    length: "P0H9M43S",
    viewCount: 4672695,
    publishedAt: "2023-04-29T07:34:46Z",
  },
  {
    id: "5",
    title: "From the Terrace",
    owner: pewdiepie,
    thumbnailUrl: "http://dummyimage.com/720x404.png/ff4444/ffffff",
    url: "/watch?v=5",
    length: "P0H9M43S",
    viewCount: 23680613,
    publishedAt: "2022-03-01T05:10:41Z",
  },
  {
    id: "6",
    title: "Place Called Chiapas, A",
    owner: pewdiepie,
    thumbnailUrl: "http://dummyimage.com/720x404.png/cc0000/ffffff",
    url: "/watch?v=6",
    length: "P0H9M43S",
    viewCount: 388342832,
    publishedAt: "2022-09-09T04:48:28Z",
  },
  {
    id: "7",
    title: "Prom",
    owner: pewdiepie,
    thumbnailUrl: "http://dummyimage.com/720x404.png/ff4444/ffffff",
    url: "/watch?v=7",
    length: "P0H9M43S",
    viewCount: 1530598338,
    publishedAt: "2021-11-05T12:52:22Z",
  },
  {
    id: "8",
    title: "Midsummer Night's Sex Comedy, A",
    owner: pewdiepie,
    thumbnailUrl: "http://dummyimage.com/720x404.png/dddddd/000000",
    url: "/watch?v=8",
    length: "P0H9M43S",
    viewCount: 122062917,
    publishedAt: "2021-01-02T10:50:25Z",
  },
  {
    id: "9",
    title: "She and Her Cat (Kanojo to kanojo no neko)",
    owner: pewdiepie,
    thumbnailUrl: "http://dummyimage.com/720x404.png/5fa2dd/ffffff",
    url: "/watch?v=9",
    length: "P0H9M43S",
    viewCount: 662712793,
    publishedAt: "2020-12-09T11:10:18Z",
  },
  {
    id: "10",
    title: "Young and Innocent",
    owner: pewdiepie,
    thumbnailUrl: "http://dummyimage.com/720x404.png/5fa2dd/ffffff",
    url: "/watch?v=10",
    length: "P0H9M43S",
    viewCount: 587880589,
    publishedAt: "2023-01-14T06:30:55Z",
  },
  {
    id: "11",
    title: "The 21 Carat Snatch",
    owner: pewdiepie,
    thumbnailUrl: "http://dummyimage.com/720x404.png/cc0000/ffffff",
    url: "/watch?v=11",
    length: "P0H9M43S",
    viewCount: 652290040,
    publishedAt: "2021-07-07T05:13:01Z",
  },
  {
    id: "12",
    title: "Feast of July",
    owner: pewdiepie,
    thumbnailUrl: "http://dummyimage.com/720x404.png/dddddd/000000",
    url: "/watch?v=12",
    length: "P0H9M43S",
    viewCount: 861471091,
    publishedAt: "2023-07-07T01:37:38Z",
  },
  {
    id: "13",
    title: "Jungleground",
    owner: pewdiepie,
    thumbnailUrl: "http://dummyimage.com/720x404.png/cc0000/ffffff",
    url: "/watch?v=13",
    length: "P0H9M43S",
    viewCount: 51674588,
    publishedAt: "2023-05-27T12:49:04Z",
  },
  {
    id: "14",
    title: "Violette",
    owner: pewdiepie,
    thumbnailUrl: "http://dummyimage.com/720x404.png/dddddd/000000",
    url: "/watch?v=14",
    length: "P0H9M43S",
    viewCount: 22092837,
    publishedAt: "2022-09-05T11:15:20Z",
  },
  {
    id: "15",
    title: "Fixed Bayonets!",
    owner: pewdiepie,
    thumbnailUrl: "http://dummyimage.com/720x404.png/dddddd/000000",
    url: "/watch?v=15",
    length: "P0H9M43S",
    viewCount: 869173547,
    publishedAt: "2021-02-20T06:20:29Z",
  },
  {
    id: "16",
    title: "With Love... from the Age of Reason",
    owner: pewdiepie,
    thumbnailUrl: "http://dummyimage.com/720x404.png/ff4444/ffffff",
    url: "/watch?v=16",
    length: "P0H9M43S",
    viewCount: 258217697,
    publishedAt: "2022-01-06T08:52:38Z",
  },
  {
    id: "17",
    title: "Valley of Decision, The",
    owner: pewdiepie,
    thumbnailUrl: "http://dummyimage.com/720x404.png/cc0000/ffffff",
    url: "/watch?v=17",
    length: "P0H9M43S",
    viewCount: 172915991,
    publishedAt: "2021-10-19T18:29:11Z",
  },
  {
    id: "18",
    title: "Five Senses, The",
    owner: pewdiepie,
    thumbnailUrl: "http://dummyimage.com/720x404.png/cc0000/ffffff",
    url: "/watch?v=18",
    length: "P0H9M43S",
    viewCount: 368144591,
    publishedAt: "2020-07-05T17:29:32Z",
  },
  {
    id: "19",
    title: "Stardom",
    owner: pewdiepie,
    thumbnailUrl: "http://dummyimage.com/720x404.png/5fa2dd/ffffff",
    url: "/watch?v=19",
    length: "P0H9M43S",
    viewCount: 148747742,
    publishedAt: "2021-03-13T10:25:25Z",
  },
  {
    id: "20",
    title: "Facing Windows (Finestra di fronte, La)",
    owner: pewdiepie,
    thumbnailUrl: "http://dummyimage.com/720x404.png/5fa2dd/ffffff",
    url: "/watch?v=20",
    length: "P0H9M43S",
    viewCount: 894346104,
    publishedAt: "2023-04-07T13:31:09Z",
  },
  {
    id: "21",
    title: "April Fools, The",
    owner: pewdiepie,
    thumbnailUrl: "http://dummyimage.com/720x404.png/ff4444/ffffff",
    url: "/watch?v=21",
    length: "P0H9M43S",
    viewCount: 743662271,
    publishedAt: "2022-10-03T04:32:11Z",
  },
  {
    id: "22",
    title: "Death Note 2: The Last Name",
    owner: pewdiepie,
    thumbnailUrl: "http://dummyimage.com/720x404.png/dddddd/000000",
    url: "/watch?v=22",
    length: "P0H9M43S",
    viewCount: 424783903,
    publishedAt: "2021-07-23T16:48:29Z",
  },
  {
    id: "23",
    title: "If I Were You",
    owner: pewdiepie,
    thumbnailUrl: "http://dummyimage.com/720x404.png/cc0000/ffffff",
    url: "/watch?v=23",
    length: "P0H9M43S",
    viewCount: 502053081,
    publishedAt: "2021-04-05T08:57:21Z",
  },
  {
    id: "24",
    title: "Hidden, The",
    owner: pewdiepie,
    thumbnailUrl: "http://dummyimage.com/720x404.png/dddddd/000000",
    url: "/watch?v=24",
    length: "P0H9M43S",
    viewCount: 262354345,
    publishedAt: "2022-03-14T05:28:58Z",
  },
];

export const videosRouter = createTRPCRouter({
  list: publicProcedure
    .input(z.object({ page: z.number() }))
    .query(async ({ input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (input.page > 3) {
        return [];
      }

      return videos;
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
