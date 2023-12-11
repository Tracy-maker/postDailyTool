import { type ClassValue, clsx } from "clsx";
import { time } from "console";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString:string):string {
  const currentDate = new Date();
  const inputDate = new Date(dateString);
  const timeDifference = currentDate - inputDate;
  const secondsDifference = timeDifference / 1000;

  if (secondsDifference < 60) {
    return `${Math.floor(secondsDifference)} seconds ago`;

}else if (secondsDifference<3600){
  const minutes = Math.floor(secondsDifference /60);
  return `$(minutes) ${minutes===1 ? 'minute':'minutes'}ago`;
}else if (secondsDifference<86400){
  const hours = Math.floor(secondsDifference / 3600);
  return `$(hours) ${hours===1 ? 'hour':'hours'}ago`;
}else{
  const days = Math.floor(secondsDifference/86400);
}
