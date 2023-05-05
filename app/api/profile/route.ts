import { NextResponse } from "next/server";

export async function getUserInfo() {
  return NextResponse.json({
    name: "Dance Party",
    bio: "In moonlit shadows, bodies sway, A rhythmic beat calls them to play. With every pulse and heart's desire, They join the dance, a burning fire.",
    ig: "https://www.instagram.com/judyxkam/",
    tk: "https://www.tiktok.com/@judyxkam?ug_source=op.auth&ug_term=&utm_source=awnuf8qyocl7mnug&utm_campaign=tt4d_profile_link&_r=1",
  });
}
