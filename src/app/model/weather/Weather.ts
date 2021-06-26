import {ConsolidatedWeather} from "./ConsolidatedWeather";
import {Source} from "./Source";
import {Parent} from "./Parent";

export interface Weather {
  consolidated_weather: ConsolidatedWeather[];
  time: Date;
  sun_rise: Date;
  sun_set: Date;
  timezone_name: string;
  parent: Parent;
  sources: Source[];
  title: string;
  location_type: string;
  woeid: number;
  latt_long: string;
  timezone: string;
}
