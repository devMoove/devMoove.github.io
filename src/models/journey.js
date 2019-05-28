// /* eslint-disable import/prefer-default-export */
// import Realm from "realm";

// const JOURNEY = "JOURNEY";
// const COORDINATES = "COORDINATES";

// const journey = {
//   name: JOURNEY,
//   primaryKey: "sessionID",
//   properties: {
//     sessionID: "int",
//     pickup: { optional: true, objectType: COORDINATES },
//     destination: { optional: true, objectType: COORDINATES },
//     date: { optional: true, type: "date" },
//     type: { optional: true, type: "string" },
//     description: { optional: true, type: "string" },
//     vehicle: { optional: true, type: "string" },
//     synced: { type: "bool", default: false }
//   }
// };

// const coordinates = {
//   name: COORDINATES,
//   properties: {
//     longitude: "string",
//     latitude: "string"
//   }
// };

// const store = {
//   path: "store.realm",
//   schema: [journey, coordinates],
//   schemaVersion: 0
// };

// export const write = prop =>
//     new Promise(async (resolve, reject) => {
//       Realm.open(store)
//         .then(_realm => {
//           _realm.create(JOURNEY, prop, true);
//         })
//         .catch(err => {
//           console.log(err);
//           reject("Write Failure");
//         });
//     }),
//   read = prop =>
//     new Promise(async (resolve, reject) => {
//       Realm.open(store)
//         .then(_realm => {
//           let session = _realm.objectForPrimaryKey(JOURNEY, prop);
//           if (session) {
//             resolve(session);
//           } else {
//             reject("N/A");
//           }
//         })
//         .catch(err => {
//           console.log(err);
//           reject("Read Error");
//         });
//     }),
//   core = new Realm(store);
