import $ from "jquery";
import FindParent from "./components/FindParent";

$(".find-parent").each((index, element) => new FindParent(element));
