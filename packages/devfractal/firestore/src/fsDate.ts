import * as firebase from 'firebase/app'
import 'firebase/firestore'
import * as t from 'srtp-utils'
import { date } from 'srtp-utils'

export interface DateFromTimestampC
  extends t.Type<Date, firebase.firestore.Timestamp> {}

export const DateFromTimestamp: DateFromTimestampC = new t.Type<
  Date,
  firebase.firestore.Timestamp,
  unknown
>(
  'DateFromTimestamp',
  (u): u is Date => u instanceof Date,
  (u, c) =>
    u instanceof firebase.firestore.Timestamp
      ? t.success(u.toDate())
      : t.failure(u, c),

  a => firebase.firestore.Timestamp.fromDate(a),
)

// tslint:disable-next-line: typedef
export const FSDate = t.union([date, DateFromTimestamp])
