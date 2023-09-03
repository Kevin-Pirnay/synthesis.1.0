import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.css']
})
export class InfosComponent  implements OnInit
{
  ngOnInit(): void 
  {
    Cubes_.add_cube(Point_.new(30,30,0),30);

    //Cubes_.add_circle();

    Cubes_.rotate(Point_.new(0.2,-0.4,-0.4));
  }
}

class Point
{
    __ = new Point_(this);

    x : number = 0;
    y : number = 0;
    z : number = 0;
}

class Point_
{
    private point : Point;

    constructor(point : Point)
    {
        this.point = point;
    }

    public add_by_point(point : Point) : void
    {
        this.point.x += point.x;
        this.point.y += point.y;
        this.point.z += point.z;
    }

    public to_array() : number[]
    {
        return [this.point.x,this.point.y, this.point.z]
    }

    public set(index : number, value : number) : void
    {
        if(index == 0) this.point.x = value;
        if(index == 1) this.point.y = value;
        if(index == 2) this.point.z = value;
    }

    public static new(x : number,y : number,z : number) : Point
    {
        const point = new Point();
        point.x = x;
        point.y = y;
        point.z = z;
        return point;
    }
}

class Face
{
    __ = new Face_(this);

    p1 = new Point();
    p2 = new Point();
    p3 = new Point();
    p4 = new Point();
}

class Face_
{
    private face : Face;

    constructor(face : Face)
    {
        this.face = face
    }

    public toString() : string
    {
        const str = `M${this.face.p1.x} ${this.face.p1.y} L${this.face.p2.x} ${this.face.p2.y} L${this.face.p3.x} ${this.face.p3.y} L${this.face.p4.x} ${this.face.p4.y} L${this.face.p1.x} ${this.face.p1.y}`;
        
        return `<path class="face" d="${str}" fill-opacity="0.3" stroke-opacity="1" stroke="gray" fill="#7897b0"/>`
    }

    public points() : Point[]
    {
        return [this.face.p1, this.face.p2, this.face.p3, this.face.p4];
    }

    public add_by_point(point : Point) : void
    {
        for(let i = 0; i < this.face.__.points().length; i++)
        {
            this.face.__.points()[i].__.add_by_point(point);
        }
    }

    public static new_X(origin : Point, width : number) : Face
    {   
        const face = new Face();

        face.p1 = Point_.new(0, 0, 0);
        face.p2 = Point_.new(width, 0, 0);
        face.p3 = Point_.new(width, Math.abs(width), 0);
        face.p4 = Point_.new(0, Math.abs(width), 0);

        const points = [face.p1, face.p2, face.p3, face.p4];

        for(let i = 0; i < 4; i++)
        {
            points[i].__.add_by_point(origin);
        }

        return face;
    }

    public static new_Y(origin : Point, width : number) : Face
    {   
        const face = new Face();

        face.p1 = Point_.new(0, 0, 0);
        face.p2 = Point_.new(0, 0, width);
        face.p3 = Point_.new(0, Math.abs(width), width);
        face.p4 = Point_.new(0, Math.abs(width), 0);

        const points = [face.p1, face.p2, face.p3,face.p4];

        for(let i = 0; i < 4; i++)
        {
            points[i].__.add_by_point(origin);
        }

        return face;
    }

    public static new_Z(origin : Point, width : number) : Face
    {   
        const face = new Face();

        face.p1 = Point_.new(0, 0, 0);
        face.p2 = Point_.new(width, 0, 0);
        face.p3 = Point_.new(width, 0, width);
        face.p4 = Point_.new(0, 0, width);

        const points = [face.p1, face.p2, face.p3,face.p4];

        for(let i = 0; i < points.length; i++)
        {
            points[i].__.add_by_point(origin);
        }

        return face;
    }
}

class Cube
{
    __ = new Cube_(this);

    f1 = new Face();
    f2 = new Face();
    f3 = new Face();
    f4 = new Face();
    f5 = new Face();
    f6 = new Face();

    id = crypto.randomUUID();
}

class Cube_
{
    private cube;

    constructor(cube : Cube)
    {
        this.cube = cube;
    }

    public faces() : Face[]
    {
        return [this.cube.f1,this.cube.f2,this.cube.f3,this.cube.f4,this.cube.f5,this.cube.f6];
    }

    public toString() : string
    {
        const str = this.cube.__.set_string();

        return `<g class="cube id=${this.cube.id}">${str}</g>`;
    }

    public set_string() : string
    {
        let str = "";

        for(let i = 0; i < this.cube.__.faces().length; i++)
        {
            const face = this.cube.__.faces()[i];

            str += face.__.toString() + " ";
        }     


        return str;
    }

    public center() : Point
    {
        const x = (this.cube.f1.p1.x + this.cube.f1.p2.x) / 2;
        const y = (this.cube.f1.p1.y + this.cube.f1.p4.y) / 2;
        const z = (this.cube.f1.p1.z + this.cube.f3.p1.z) / 2;

        return Point_.new(x,y,z);
    }

    public to_matrix() : Matrix
    {
        const matrix = new Matrix();

        this.cube.__.faces().forEach(face => 
        {
            face.__.points().forEach(point => matrix.__.add_point(point));
        });

        return matrix;
    }

    public static new(origin : Point, width : number) : Cube
    {
        const cube = new Cube();

        cube.f1 = Face_.new_X(Point_.new(0,0,0), width);
        cube.f2 = Face_.new_Y(Point_.new(width,0,0), width);
        cube.f3 = Face_.new_X(Point_.new(width,0,width), -width);
        cube.f4 = Face_.new_Y(Point_.new(0,0,width), -width);
        cube.f5 = Face_.new_Z(Point_.new(0,0,0), width);
        cube.f6 = Face_.new_Z(Point_.new(0,width,0), width);

        const faces = [cube.f1,cube.f2,cube.f3,cube.f4,cube.f5,cube.f6];

        for(let i = 0; i < faces.length; i++)
        {
            faces[i].__.add_by_point(origin);
        }

        return cube;
    }
}

class Cubes_
{
    static __cubes : Cube[] = [];
    static __centers : Point[] = [];

    static add_cube(origin : Point, width :number) : void
    {
        const cube = Cube_.new(origin, width);

        this.__cubes.push(cube);

        this.__centers.push(cube.__.center());

        const divs = document.querySelectorAll(".cubes");

        divs.forEach(div => div.innerHTML = cube.__.toString());
    }

    public static add_circle() : void
    {
        let str = "";

        this.__centers.forEach(center => str+=`<circle fill="red" class="circle-cube" cx="${center.x}" cy="${center.y}" r="${2}"/> `);

        const div = document.querySelector(".inner-cube-circle");

        if(!div) throw new Error("unable to select the inner-cube-circle div");

        div.innerHTML = str;
    }

    public static async rotate(rate : Point) : Promise<void>
    {
        const radian = Math.PI/180;
        
        while(1)
        {  
            for(let i = 0; i < this.__cubes.length; i++) 
            {
                const cube = this.__cubes[i];
                const center = this.__centers[i];

                const transformX = Rotation.rotation_X(rate.x * radian);
                const transformY = Rotation.rotation_Y(rate.y * radian);
                const transformZ = Rotation.rotation_Z(rate.z * radian);

                const transform = transformY.__.multiply_by_matrix(transformX).__.multiply_by_matrix(transformZ);

                cube.__.to_matrix().__.add_by_vector(Point_.new(-center.x,-center.y, -center.z)).__.multiply_by_matrix(transform).__.add_by_vector(Point_.new(center.x,center.y,center.z));
                
                const divs = document.querySelectorAll(`.cube`);

                divs.forEach(div => div.innerHTML = cube.__.set_string());
            }
           
            
            await new Promise(r => setTimeout(r,1));
        }
    }
}

class Matrix
{
    __ = new Matrix_(this);

    points : Point[] = [];
}

class Matrix_
{
    private matrix : Matrix;

    constructor(matrix : Matrix)
    {
        this.matrix = matrix;
    }

    public copy() : Matrix
    {
        const result = new Matrix();

        for(let i = 0; i < this.matrix.points.length; i++)
        {
            const point = this.matrix.points[i];
            result.__.add_point(Point_.new(point.x,point.y,point.z));
        }
        return result;
    }

    public assign_new_data(data : Matrix)
    {
        for(let i = 0; i < data.points.length; i++)
        {
            this.matrix.points[i].x = data.points[i].x;
            this.matrix.points[i].y = data.points[i].y;
            this.matrix.points[i].z = data.points[i].z;
        }
    }

    public add_point(point : Point) : void
    {
        this.matrix.points.push(point);
    }

    public multiply_by_matrix(transform : Matrix) : Matrix
    {  
        const result = new Matrix();
          
        for(let i = 0; i < this.matrix.points.length; i++) //for each old points
        {     
            const point = new Point();

            for(let j = 0; j < transform.points.length; j++) //for each axes of transform
            {
                let new_coordinate : number = 0;

               for(let l = 0; l < transform.points[j].__.to_array().length; l++) //for each dimension of axes in transform
                { 
                    new_coordinate += this.matrix.points[i].__.to_array()[l] * transform.points[j].__.to_array()[l]; //here l is the dimension, j is the current axe of the transform and i is the old point that is being currently mapping
                }
                
                point.__.set(j, new_coordinate);                
            }  
            
            result.__.add_point(point);
        }
        this.matrix.__.assign_new_data(result);

        return this.matrix;
    }

    public add_by_vector(vector : Point) : Matrix
    {
        for(let i = 0; i < this.matrix.points.length; i++)
        {
            this.matrix.points[i].x += vector.x;
            this.matrix.points[i].y += vector.y;
            this.matrix.points[i].z += vector.z;
        }

        return this.matrix;
    }

    public static new(points : Point[] = []) : Matrix
    {
        const matrix = new Matrix();

        points.forEach(point => matrix.points.push(point));

        return matrix;
    }
}

class Rotation 
{
    public static rotation_Y(radian : number) : Matrix
    {
        return Matrix_.new(
            [
                Point_.new(Math.cos(radian), 0, Math.sin(radian)),
                Point_.new(0, 1, 0),
                Point_.new(-Math.sin(radian), 0, Math.cos(radian))
            ]
        );
    };

    public static rotation_X(radian : number)  : Matrix
    {
        return Matrix_.new(
            [
                Point_.new(1, 0, 0),
                Point_.new(0, Math.cos(radian), Math.sin(radian)),
                Point_.new(0, -Math.sin(radian), Math.cos(radian))
            ]
        );
    };

    public static rotation_Z(radian : number)  : Matrix
    {
        return Matrix_.new(
            [
                Point_.new(Math.cos(radian), Math.sin(radian), 0),
                Point_.new(-Math.sin(radian), Math.cos(radian), 0),
                Point_.new(0, 0, 1)
            ]
        );
    };
}


