import { Vector_ } from "../Vector/Vector_";
import { Matrix } from "./Matrix";

export class Rotation 
{
    public rotation_Y = (radian: number): Matrix<3> => 
    {
        return new Matrix(
            [
                Vector_.new([Math.cos(radian), 0, Math.sin(radian)]),
                Vector_.new([0, 1, 0]),
                Vector_.new([-Math.sin(radian), 0, Math.cos(radian)])
            ]
        );
    };

    public rotation_X = (radian: number): Matrix<3> => 
    {
        return new Matrix(
            [
                Vector_.new([1, 0, 0]),
                Vector_.new([0, Math.cos(radian), -Math.sin(radian)]),
                Vector_.new([0, Math.sin(radian), Math.cos(radian)])
            ]
        );
    };

    public rotation_Z = (radian: number): Matrix<3> => 
    {
        return new Matrix(
            [
                Vector_.new([Math.cos(radian), Math.sin(radian), 0]),
                Vector_.new([-Math.sin(radian), Math.cos(radian), 0]),
                Vector_.new([0, 0, 1])
            ]
        );
    };
}
